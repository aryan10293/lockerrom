const checkUser = async () => {
    try {
    const response = await fetch('http://localhost:2012/checkuser', {
        method: 'GET',
        credentials: 'include'
    });
    const data = await response.json();
    console.log(data)
    } catch (error) {
    console.error(error);
    }
}
export default checkUser