/* eslint-disable no-use-before-define */
import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  DataTypes,
  Sequelize,
  Association,
  NonAttribute,
  HasManyGetAssociationsMixin,
  HasManyAddAssociationMixin,
  HasManyAddAssociationsMixin,
  HasManySetAssociationsMixin,
  HasManyRemoveAssociationMixin,
  HasManyRemoveAssociationsMixin,
  HasManyHasAssociationMixin,
  HasManyHasAssociationsMixin,
  HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin
} from 'sequelize'

import { Project } from './project'

// order of InferAttributes & InferCreationAttributes is important.
class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  // 'CreationOptional' is a special type that marks the field as optional
  // when creating an instance of the model (such as using Model.create()).
  declare id: CreationOptional<number>
  declare name: string
  declare lastName: string
  declare email: string

  // createdAt can be undefined during creation
  declare createdAt: CreationOptional<Date>
  // updatedAt can be undefined during creation
  declare updatedAt: CreationOptional<Date>

  // Since TS cannot determine model association at compile time
  // we have to declare them here purely virtually
  // these will not exist until `Model.init` was called.
  declare getProjects: HasManyGetAssociationsMixin<Project> // Note the null assertions!
  declare addProject: HasManyAddAssociationMixin<Project, number>
  declare addProjects: HasManyAddAssociationsMixin<Project, number>
  declare setProjects: HasManySetAssociationsMixin<Project, number>
  declare removeProject: HasManyRemoveAssociationMixin<Project, number>
  declare removeProjects: HasManyRemoveAssociationsMixin<Project, number>
  declare hasProject: HasManyHasAssociationMixin<Project, number>
  declare hasProjects: HasManyHasAssociationsMixin<Project, number>
  declare countProjects: HasManyCountAssociationsMixin
  declare createProject: HasManyCreateAssociationMixin<Project, 'ownerId'>

  // You can also pre-declare possible inclusions, these will only be populated if you
  // actively include a relation.
  declare projects?: NonAttribute<Project[]> // Note this is optional since it's only populated when explicitly requested in code

  declare static associations: {
    projects: Association<User, Project>
  }
}

const initUser = (sequelize: Sequelize) => {
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: new DataTypes.STRING(128),
        allowNull: false
      },
      lastName: {
        type: new DataTypes.STRING(128),
        allowNull: false
      },
      email: {
        type: new DataTypes.STRING(128),
        allowNull: false
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE
    },
    {
      sequelize,
      tableName: 'users'
    }
  )

  User.hasMany(Project, {
    sourceKey: 'id',
    foreignKey: 'ownerId',
    as: 'projects' // this determines the name in `associations`!
  })
}

export { User, initUser }
