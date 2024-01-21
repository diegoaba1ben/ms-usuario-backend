import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {DatabaseCfjmbDataSource} from '../datasources';
import {Rol, RolRelations, Permiso, RolPermiso} from '../models';
import {RolPermisoRepository} from './rol-permiso.repository';
import {PermisoRepository} from './permiso.repository';

export class RolRepository extends DefaultCrudRepository<
  Rol,
  typeof Rol.prototype.id,
  RolRelations
> {

  public readonly asigPermisoaRol: HasManyThroughRepositoryFactory<Permiso, typeof Permiso.prototype.id,
          RolPermiso,
          typeof Rol.prototype.id
        >;

  public readonly permisoRol: HasManyThroughRepositoryFactory<Permiso, typeof Permiso.prototype.id,
          RolPermiso,
          typeof Rol.prototype.id
        >;

  constructor(
    @inject('datasources.databaseCFJMB') dataSource: DatabaseCfjmbDataSource, @repository.getter('RolPermisoRepository') protected rolPermisoRepositoryGetter: Getter<RolPermisoRepository>, @repository.getter('PermisoRepository') protected permisoRepositoryGetter: Getter<PermisoRepository>,
  ) {
    super(Rol, dataSource);
    this.permisoRol = this.createHasManyThroughRepositoryFactoryFor('permisoRol', permisoRepositoryGetter, rolPermisoRepositoryGetter,);
    this.registerInclusionResolver('permisoRol', this.permisoRol.inclusionResolver);
    this.asigPermisoaRol = this.createHasManyThroughRepositoryFactoryFor('asigPermisoaRol', permisoRepositoryGetter, rolPermisoRepositoryGetter,);
    this.registerInclusionResolver('asigPermisoaRol', this.asigPermisoaRol.inclusionResolver);
  }
}
