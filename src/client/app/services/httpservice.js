//@todo change to use fetch
export default http => {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open(http.method || "GET", http.url);
        if (http.headers) {
            Object.keys(http.headers).forEach(key => {
                xhr.setRequestHeader(key, http.headers[key]);
            });
        }
        xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status < 300) {
                resolve(xhr.response);
            } else {
                reject(xhr.statusText);
            }
        };
        xhr.onerror = () => reject(xhr.statusText);
        xhr.send(http.body);
    });
};
