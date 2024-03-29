import {Entity, hasMany, model, property} from '@loopback/repository';
import {Permiso} from './permiso.model';
import {RolPermiso} from './rol-permiso.model';

@model()
export class Rol extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  nombreRol: string;

  @property({
    type: 'string',
  })
  descripcion?: string;

  @property({
    type: 'boolean',
    required: true,
  })
  estado: boolean;

  @hasMany(() => Permiso, {through: {model: () => RolPermiso}})
  asignaciones: Permiso[];

  constructor(data?: Partial<Rol>) {
    super(data);
  }
}

export interface RolRelations {
  // describe navigational properties here
}

export type RolWithRelations = Rol & RolRelations;
