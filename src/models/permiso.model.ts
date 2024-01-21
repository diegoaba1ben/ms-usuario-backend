import {Entity, model, property} from '@loopback/repository';

@model()
export class Permiso extends Entity {
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
  nombrePermiso: string;

  @property({
    type: 'string',
  })
  descripcion?: string;

  @property({
    type: 'boolean',
    reuired: true,
  })
  estado: boolean;


  constructor(data?: Partial<Permiso>) {
    super(data);
  }
}

export interface PermisoRelations {
  // describe navigational properties here
}

export type PermisoWithRelations = Permiso & PermisoRelations;
