export class productService {
    static async fetchData(url) {
        try {
            const response = await axios.get(url);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }

    static async addData(data) {
        console.log("aaa=", data);

        try {
            //await axios.post('http://localhost:3000/api/products', data);
            const token = localStorage.getItem('accessToken');
            await axios.post('http://localhost:3000/api/products', data, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
        } catch (error) {
            console.log("bbb=", error);
            if (error.response && error.response.status === 401) {
                // Access Token hết hạn, lấy lại new access token từ refresh token
                try {
                    // Gọi API refresh token để lấy new access token
                    //const response = await axios.post('http://localhost:3000/api/refresh-token', { withCredentials: true });
                    const response = await axios.post(
                        'http://localhost:3000/api/refresh-token',
                        {}, // body rỗng
                        { withCredentials: true } // config
                    );
                    console.log("ccc=", response);
                    // Cập nhật the access token và refresh token
                    const accessToken = response.data.access_token;
                    localStorage.setItem('accessToken', accessToken);

                    // Retry add the product with the new token
                    await axios.post('http://localhost:3000/api/products', data, {
                        headers: {
                            Authorization: `Bearer ${accessToken}`
                        }
                    });
                } catch (refreshError) {
                    console.error('Error refreshing token:', refreshError);
                    // Nếu refresh token lỗi thì redirect về trang login
                    //window.location.href = '../site/login.html';
                }
            } else {
                console.error('Error fetching data:', error);
                throw error;
            }
        }

    }

    static async deleteData(id) {
        try {
            const token = localStorage.getItem('accessToken');
            await axios.delete(`http://localhost:3000/api/products/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(`Data with id ${id} has been deleted.`);
        } catch (error) {
            if (error.response && error.response.status === 401) {
                // Access Token hết hạn, lấy lại new access token từ refresh token
                try {
                    // Gọi API refresh token để lấy new access token
                    //const response = await axios.post('http://localhost:3000/api/refresh-token', { withCredentials: true });
                    const response = await axios.post(
                        'http://localhost:3000/api/refresh-token',
                        {}, // body rỗng
                        { withCredentials: true } // config
                    );
                    console.log("ccc=", response);
                    // Cập nhật the access token và refresh token
                    const accessToken = response.data.access_token;
                    localStorage.setItem('accessToken', accessToken);

                    // Retry adding the product with the new token
                    await axios.delete(`http://localhost:3000/api/products/${id}`, data, {
                        headers: {
                            Authorization: `Bearer ${accessToken}`
                        }
                    });
                } catch (refreshError) {
                    console.error('Error refreshing token:', refreshError);
                    // Nếu refresh token lỗi thì redirect về trang login
                    window.location.href = '../site/login.html';
                }
            } else {
                console.error('Error fetching data:', error);
                throw error;
            }
        }
    }

    static async updateData(id, data) {
        try {
            //await axios.put(`http://localhost:3000/api/products/${id}`, data);
            
            const token = localStorage.getItem('accessToken');
            await axios.put(`http://localhost:3000/api/products/${id}`, data, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(`Data with id ${id} has been updated.`);
        } catch (error) {
            if (error.response && error.response.status === 401) {
                // Access Token hết hạn, lấy lại new access token từ refresh token
                try {
                    // Gọi API refresh token để lấy new access token
                    //const response = await axios.post('http://localhost:3000/api/refresh-token', { withCredentials: true });
                    const response = await axios.post(
                        'http://localhost:3000/api/refresh-token',
                        {}, // body rỗng
                        { withCredentials: true } // config
                    );
                    console.log("ccc=", response);
                    // Cập nhật the access token và refresh token
                    const accessToken = response.data.access_token;
                    localStorage.setItem('accessToken', accessToken);

                    // Retry add the product with the new token
                    await axios.put(`http://localhost:3000/api/products/${id}`, data, {
                        headers: {
                            Authorization: `Bearer ${accessToken}`
                        }
                    });
                } catch (refreshError) {
                    console.error('Error refreshing token:', refreshError);
                    // Nếu refresh token lỗi thì redirect về trang login
                    //window.location.href = '../site/login.html';
                }
            } else {
                console.error('Error fetching data:', error);
                throw error;
            }
        }
    }

    static async getDataById(id) {
        try {
            const response = await axios.get(`http://localhost:3000/api/products/${id}`);
            return response.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    static async getLastId() {
        try {
            const response = await axios.get('http://localhost:3000/api/products');
            return response.data[response.data.length - 1].id;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    static async isAuth() {
        try {
            const token = localStorage.getItem('accessToken');
            const response = await axios.get('http://localhost:3000/api/is-auth', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(response.message);
        } catch (error) {
            if (error.response && error.response.status === 401) {
                // Redirect to login page
                window.location.href = '../site/login.html';
            } else {
                console.error('Error fetching data:', error);
                throw error;
            }
        }
    }
}
