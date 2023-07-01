import { Expose } from 'class-transformer';

export class UserResponseDto {
  @Expose()
  public email!: string;

  @Expose()
  public password!: string;

  @Expose()
  public firstName!: string;

  @Expose()
  public secondName!: string;

  @Expose()
  public avatarUrl!: string;
}
