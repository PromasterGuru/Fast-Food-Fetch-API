require('../static/js/auth')
describe('login',()=>{
let fetchMock;
let assignMock;
beforeEach(()=>{
    document.body.innerHTML += `
    <form  onsubmit="event.preventDefault();" id='login'>
      <input type="text" id="username" value="Promaster">
      <input type="text" id="password" value="Promaster2018">
      <button id="btnsubmit" onclick="login();"></button>
      <span id="error"></span>
    </form>`;

    fetchMock = jest.spyOn(global, 'fetch')
    fetchMock.mockImplementation(()=>Promise.resolve({
      json: ()=>Promise.resolve({Message: "Login successful, Welcome Promaster"})}))
    assignMock = jest.spyOn(window.location, 'assign')
    assignMock.mockImplementation(()=>{})
})
//Tear Down
afterEach(()=>{
    fetchMock.mockRestore();
    assignMock.mockRestore();
    jest.resetModules();
})

//Test for valid user login
it('Registered user login and assign to the menu page.', async() => {
    document.getElementById('btnsubmit').click();
    expect(fetchMock).toHaveBeenCalledTimes(1);
    const fetchArgs = fetchMock.mock.calls[0];
    expect(fetchArgs[0]).toBe("https://morning-springs-84037.herokuapp.com/https://pro-fast-food-fast-api.herokuapp.com/api/v2/auth/login");
    expect(fetchArgs[1]).toEqual({
        method: 'POST',
        body: JSON.stringify({
            username:'Promaster',
            password: 'Promaster2018'
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    await Promise.resolve().then();
    expect(localStorage.getItem('user')).toEqual("Promaster");
    expect(localStorage.getItem('token')).not.toBeNull();
    expect(document.getElementById('error').innerHTML).toBe("Login successful, Welcome Promaster");
    await Promise.resolve().then();
    expect(assignMock).toHaveBeenCalledTimes(1);
    expect(assignMock.mock.calls[0][0]).toBe("/menu");
})

//Test user login without Password
it('User login without password', async() => {
    fetchMock = jest.spyOn(global, 'fetch')
    fetchMock.mockImplementation(()=>Promise.resolve({
      json: ()=>Promise.resolve({Message: "User not verified, Please login again!"})}))
    document.getElementById('password').value = "";
    document.getElementById('btnsubmit').click();
    expect(fetchMock).toHaveBeenCalledTimes(1);
    const fetchArgs = fetchMock.mock.calls[0];
    expect(fetchArgs[0]).toBe("https://morning-springs-84037.herokuapp.com/https://pro-fast-food-fast-api.herokuapp.com/api/v2/auth/login");
    expect(fetchArgs[1]).toEqual({
        method: 'POST',
        body: JSON.stringify({
            username:'Promaster',
            password: ""
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    await Promise.resolve().then();
    expect(document.getElementById('error').innerHTML).toBe("User not verified, Please login again!");
})
})
//Test user login with unregistered password or username
it('User login without password', async() => {
    fetchMock = jest.spyOn(global, 'fetch')
    fetchMock.mockImplementation(()=>Promise.resolve({
      json: ()=>Promise.resolve({Message: "Username or password was incorrect!"})}))
    document.getElementById('username').value = "Gedion";
    document.getElementById('password').value = "Gedion2018";
    document.getElementById('btnsubmit').click();
    expect(fetchMock).toHaveBeenCalledTimes(1);
    const fetchArgs = fetchMock.mock.calls[0];
    expect(fetchArgs[0]).toBe("https://morning-springs-84037.herokuapp.com/https://pro-fast-food-fast-api.herokuapp.com/api/v2/auth/login");
    expect(fetchArgs[1]).toEqual({
        method: 'POST',
        body: JSON.stringify({
            username:'Gedion',
            password: "Gedion2018"
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    await Promise.resolve().then();
    expect(document.getElementById('error').innerHTML).toBe("Username or password was incorrect!");
})
