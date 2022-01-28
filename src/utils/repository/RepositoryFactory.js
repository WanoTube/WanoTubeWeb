import UsersRepository from './UsersRepository';
import AuthRepository from './AuthRepository'
import VideosRepository from './VideosRepository'
const repositories = {
	users: UsersRepository,
	auth: AuthRepository,
	video: VideosRepository
};

export const RepositoryFactory = {
	get: name => repositories[name]
}