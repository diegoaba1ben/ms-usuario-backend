import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DatabaseCfjmbDataSource} from '../datasources';
import {RolPermiso, RolPermisoRelations} from '../models';

export class RolPermisoRepository extends DefaultCrudRepository<
  RolPermiso,
  typeof RolPermiso.prototype.id,
  RolPermisoRelations
> {
  constructor(
    @inject('datasources.databaseCFJMB') dataSource: DatabaseCfjmbDataSource,
  ) {
    super(RolPermiso, dataSource);
  }
}
