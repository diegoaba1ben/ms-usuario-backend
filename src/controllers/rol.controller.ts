import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  param,
  patch,
  post,
  put,
  requestBody,
  response,
} from '@loopback/rest';
import {Rol} from '../models';
import {RolRepository} from '../repositories';

export class RolController {
  constructor(
    @repository(RolRepository)
    public rolRepository: RolRepository,
  ) { }

  @post('/roles')
  @response(200, {
    description: 'Rol model instance',
    content: {'application/json': {schema: getModelSchemaRef(Rol)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Rol, {
            title: 'NewRol',
            exclude: ['id'],
          }),
        },
      },
    })
    rol: Omit<Rol, 'id'>,
  ): Promise<Rol> {
    return this.rolRepository.create(rol);
  }

  @get('/roles/count')
  @response(200, {
    description: 'Rol model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Rol) where?: Where<Rol>,
  ): Promise<Count> {
    return this.rolRepository.count(where);
  }

  @get('/roles')
  @response(200, {
    description: 'Array of Rol model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Rol, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Rol) filter?: Filter<Rol>,
  ): Promise<Rol[]> {
    return this.rolRepository.find(filter);
  }
  //método para obtener el estado de un rol
  getEstados(): string[] {
    return ['Activo', 'Inactivo'];
  }

  @patch('/roles')
  @response(200, {
    description: 'Rol PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Rol, {partial: true}),
        },
      },
    })
    rol: Rol,
    @param.where(Rol) where?: Where<Rol>,
  ): Promise<Count> {
    return this.rolRepository.updateAll(rol, where);
  }

  @get('/roles/{id}')
  @response(200, {
    description: 'Rol model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Rol, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Rol, {exclude: 'where'}) filter?: FilterExcludingWhere<Rol>
  ): Promise<Rol> {
    return this.rolRepository.findById(id, filter);
  }

  @patch('/roles/{id}')
  @response(204, {
    description: 'Rol PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Rol, {partial: true}),
        },
      },
    })
    rol: Rol,
  ): Promise<void> {
    await this.rolRepository.updateById(id, rol);
  }
  @patch('/roles/{id}/activar')
  @response(204, {
    description: 'Rol activado',
  })
  async activate(@param.path.number('id') id: number): Promise<void> {
    const rol = await this.rolRepository.findById(id);
    rol.estado = true;
    await this.rolRepository.save(rol);
  }
  @patch('/roles/{id}/desactivar')
  @response(204, {
    description: 'Rol desactivado',
  })
  async deactivate(@param.path.number('id') id: number): Promise<void> {
    const rol = await this.rolRepository.findById(id);
    rol.estado = false;
    await this.rolRepository.save(rol);
  }

  @put('/roles/{id}')
  @response(204, {
    description: 'Rol PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() rol: Rol,
  ): Promise<void> {
    await this.rolRepository.replaceById(id, rol);
  }

  @del('/roles/{id}')
  @response(204, {
    description: 'Rol DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.rolRepository.deleteById(id);
  }
}
