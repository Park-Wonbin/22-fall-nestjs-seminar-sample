import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as crypto from 'crypto';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { UserRole } from './user.meta';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {
    this.initAccount();
  }

  // 초기 관리자 계정 생성
  async initAccount() {
    const user = await this.userRepository.findOne({
      where: { email: 'admin@poapper.com' },
    });
    if (user) return;
    const salt = UserService.generateRandomString();
    this.userRepository.save({
      name: 'admin',
      email: 'admin@poapper.com',
      encryptedPassword: UserService.encryptPassword('1234', salt),
      cryptoSalt: salt,
      role: UserRole.admin,
    });
  }

  async create(dto: CreateUserDto) {
    const salt = UserService.generateRandomString();
    const { encryptedPassword, cryptoSalt, ...user } =
      await this.userRepository.save({
        name: dto.name,
        email: dto.email,
        encryptedPassword: UserService.encryptPassword(dto.password, salt),
        cryptoSalt: salt,
        role: UserRole.user,
      });
    return user;
  }

  // 로그인
  async getToken(dto: LoginDto) {
    const user = await this.userRepository.findOne({
      where: { email: dto.email },
    });
    // 비밀번호 확인 후 JWT 토큰 발급
    if (
      user &&
      user.encryptedPassword ===
        UserService.encryptPassword(dto.password, user.cryptoSalt)
    ) {
      return this.issueToken(user);
    }
    throw new NotFoundException('잘못된 이메일 또는 패스워드');
  }

  // 토큰 발급
  private issueToken(user: User) {
    return this.jwtService.sign(
      {
        user: {
          uuid: user.id,
          email: user.email,
          role: user.role,
        },
        iat: new Date().getTime(),
      },
      {
        issuer: 'sample-api',
        expiresIn: 3600000 * 3, // 3 hours
      },
    );
  }

  // 토큰 인증
  verifyToken(token: string) {
    try {
      const payload = this.jwtService.verify(token);
      // Check if the token has expired
      if (payload.exp < new Date().getTime()) return null;
      return payload.user;
    } catch (e) {
      return null;
    }
  }

  find() {
    return this.userRepository.find({
      relations: ['cats'],
      select: ['id', 'name', 'email', 'role'],
    });
  }

  findOne(id: number) {
    return this.userRepository.findOne({
      where: { id: id },
      relations: ['cats'],
      select: ['id', 'name', 'email', 'role'],
    });
  }

  update(id: number, dto: UpdateUserDto) {
    return this.userRepository.update(
      {
        id: id,
      },
      { name: dto.name },
    );
  }

  delete(id: number) {
    return this.userRepository.delete({ id: id });
  }

  // --- 패드워드 암호화를 위한 함수들 ---
  private static generateRandomString(size = 64) {
    return crypto.randomBytes(size).toString('base64');
  }
  private static encryptPassword(password: string, cryptoSalt: string) {
    return crypto
      .pbkdf2Sync(password, cryptoSalt, 10000, 64, 'sha512')
      .toString('base64');
  }
  // ------------------------------
}
