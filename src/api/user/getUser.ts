import http from '@/api/axios';
import type {User} from '@/types/User';

// 获取用户信息
export function getUser(name: string): Promise<User> {
    return http
        .get('/user/getUser', {params: {name}})
        .then((res) => res.data);
}
