import { Column, Entity, Generated, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { PartnerAccessEntity } from '../entities/partner-access.entity';
import { PartnerAdminEntity } from '../entities/partner-admin.entity';
import { BaseBloomEntity } from './base.entity';
import { CourseUserEntity } from './course-user.entity';
import { SubscriptionUserEntity } from './subscription-user.entity';
import { TherapySessionEntity } from './therapy-session.entity';

@Entity({ name: 'user' })
export class UserEntity extends BaseBloomEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'userId' })
  id: string;

  @Column({ unique: true })
  firebaseUid: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  signUpLanguage: string;

  @Column()
  contactPermission!: boolean;

  @Column({ type: Boolean, default: false })
  isSuperAdmin: boolean;

  @Column({ type: Boolean, default: true })
  isActive: boolean;

  @OneToMany(() => PartnerAccessEntity, (partnerAccess) => partnerAccess.user)
  partnerAccess: PartnerAccessEntity[];

  @OneToOne(() => PartnerAdminEntity, (partnerAdmin) => partnerAdmin.user)
  partnerAdmin: PartnerAdminEntity;

  @OneToMany(() => CourseUserEntity, (courseUser) => courseUser.user)
  courseUser: CourseUserEntity[];

  @OneToMany(() => SubscriptionUserEntity, (subscriptionUser) => subscriptionUser.user)
  subscriptionUser: SubscriptionUserEntity[];

  @OneToMany(() => TherapySessionEntity, (therapySession) => therapySession.user)
  therapySession: TherapySessionEntity[];

  @Column({ unique: true })
  @Generated('uuid')
  crispTokenId: string;
}
