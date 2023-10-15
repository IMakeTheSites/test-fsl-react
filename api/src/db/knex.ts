import Knex from 'knex';
import knexConfig from '../../knexfile';

export default Knex(knexConfig[process.env.NODE_ENV === 'development' ? 'development' : 'test' ]);
