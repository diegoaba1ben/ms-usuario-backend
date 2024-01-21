import {
  Count, CountSchema, Filter,
  repository, Where
} from '@loopback/repository';
import {
  del,
  get, getModelSchemaRef, param, patch, post, put, requestBody, response,
} from '@loopback/rest';
import {Permiso} from '../models';
import {PermisoRepository} from '../repositories';

export class PermisoController {
  constructor(
    @repository(PermisoRepository)
    public permisoRepository: PermisoRepository,
  ) { }

  @post('/permisos')
  @response(200, {
    description: 'Permiso model instance',
    content: {'application/json': {schema: getModelSchemaRef(Permiso)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Permiso, {
            title: 'NewPermiso',
            exclude: ['id'],
          }),
        },
      },
    })
    permiso: Omit<Permiso, 'id'>,
  ): Promise<Permiso> {
    return this.permisoRepository.create(permiso);
  }

  @get('/permisos/count')
  @response(200, {
    description: 'Permiso model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Permiso) where?: Where<Permiso>,
  ): Promise<Count> {
    return this.permisoRepository.count(where);
  }

  @get('/permisos')
  @response(200, {
    description: 'Array of Permiso model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Permiso, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Permiso) filter?: Filter<Permiso>,
  ): Promise<Permiso[]> {
    filter = filter || {};
    filter.where = {estado: true};
    return this.permisoRepository.find(filter);
  }

  @patch('/permisos')
  @response(200, {
    description: 'Permiso PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Permiso, {partial: true}),
        },
      },
    })
    permiso: Permiso,
    @param.where(Permiso) where?: Where<Permiso>,
  ): Promise<Count> {
    //Actualizar solo permisos activos
    return this.permisoRepository.updateAll(permiso, {estado: true});
  }

  @get('/permisos/{id}')
  @response(200, {
    description: 'Permiso model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Permiso, {includeRelations: true}),
      },
    },
  })

  async findById(
    @param.filter(Permiso) filter?: Filter<Permiso>,
  ): Promise<Permiso[]> {
    filter = filter || {};
    filter.where = {estado: true};
    return this.permisoRepository.find(filter);
  }

  @patch('/permisos/{id}')
  @response(204, {
    description: 'Permiso PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Permiso, {partial: true}),
        },
      },
    })
    permiso: Permiso,
  ): Promise<void> {
    await this.permisoRepository.updateById(id, permiso);
  }

  //Métodos para activar y desactivar permisos
  @patch('/permisos/{id/activar')
  @response(204, {
    description: 'Permiso activado',
  })
  //Métodos para activar y desactivar permisos
  @patch('/permisos/{id}/activar')  // corrected route path
  @response(204, {
    description: 'Permiso activado',
  })
  async activate(@param.path.number('id') id: number): Promise<void> {
    const permiso = await this.permisoRepository.findById(id);
    permiso.estado = true;
    await this.permisoRepository.save(permiso);
  }

  async deactivate(@param.path.number('id') id: number): Promise<void> {
    const permiso = await this.permisoRepository.findById(id);
    permiso.estado = false;
    await this.permisoRepository.save(permiso);
  }
  @put('/permisos/{id}')
  @response(204, {
    description: 'Permiso PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() permiso: Permiso,
  ): Promise<void> {
    await this.permisoRepository.replaceById(id, permiso);
  }

  @del('/permisos/{id}')
  @response(204, {
    description: 'Permiso DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.permisoRepository.deleteById(id);
  }
}
