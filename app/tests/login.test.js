require('../static/js/auth')
describe('login',()=>{
let fetchMock1;
let assignMock1;
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

//Test for valid valie user login
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
    expect(assignMock).toHaveBeenCalledTimes(1);
    expect(assignMock.mock.calls[0][0]).toBe('/menu');
    expect(document.getElementById('error').innerHTML).toBe("Login successful, Welcome Promaster");
  })
})
