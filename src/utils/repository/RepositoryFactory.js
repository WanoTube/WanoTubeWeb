import UsersRepository from './UsersRepository';

const repositories = {
    users: UsersRepository
};

export const RepositoryFactory = {
    get: name => repositories[name]
}