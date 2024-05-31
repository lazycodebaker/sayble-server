
import { Entity, PrimaryKey, Property } from '@mikro-orm/core'
import { User } from '../types'

@Entity({
      tableName: "User",
})

export class UserModel implements User {
      @PrimaryKey({
            name : "id",
            type: "string"
      })
      id!: string;

      @Property({
            name: "firstName",
            type: "varchar",
            length: 255,
      })

      firstName!: string;

      @Property({
            name: "lastName",
            type: "varchar",
            length: 255,
      })
      lastName!: string;

      @Property({
            name: "username",
            type: "varchar",
            length: 255,
      })
      username!: string;

      @Property({
            name: "email",
            type: "varchar",
            length: 255,
      })
      email!: string;

      @Property({
            name: "password",
            type: "varchar",
            length: 255,
      })
      password!: string;

      @Property({
            name: "createdAt",
            type: "date",
      })
      createdAt = new Date();

      @Property({
            name: "updatedAt",
            type: "date",
      })
      updatedAt = new Date();

      constructor(user:User) {
            Object.assign(this, user)
      };
};