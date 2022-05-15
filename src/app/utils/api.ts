import { TOKEN } from '../const';

type responseProps = {
    data: unknown,
    status: string,
    message: string,
};

const init = {
    headers: {
        'Content-Type': 'application/json',
        'X-App-Token': TOKEN,
    },
};

export const get = async (url: string): Promise<responseProps> => {
    const response = await fetch(url, {
        method: 'GET',
        ...init,
    });
    return response?.json();
};

export const post = async (url: string, data: unknown): Promise<responseProps> => {
    const response = await fetch(url, {
        method: 'POST',
        ...init,
        body: JSON.stringify(data),
    });

    return response?.json();
};
