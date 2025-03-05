document.getElementById('getDataButton').addEventListener('click', async function() {
    // Write code to disable the button after button click,
    // fetch data from https://jsonplaceholder.typicode.com/users
    // and display the data in the table with id userData
    // Each user should have a row in the table
    // Each row should have 8 columns (id, username, name, email, phone, website, company name, address)
    // Each column should have the corresponding data from the fetched data
    // If there is an error, log the error in the console
    // append each row to a table body with id userData (example below)
    // <tbody id="userData">
    //     <tr>
    //         <td>1</td>
    //         <td>Leanne Graham</td>
    //         <td>Bret</td>
    //         <td>Sincere@april.biz</td>
    //         <td>1-770-736-8031 x56442</td>
    //         <td>hildegard.org</td>
    //         <td>Romaguera-Crona</td>
    //         <td>Gwenborough, Kulas Light, Apt. 556</td>
    //     </tr>
    //     <tr>
    //         More rows...
    //     </tr>
    // </tbody>

    const req = await fetch("https://jsonplaceholder.typicode.com/users");
    const res = await req.json();

    const tBoyd = document.getElementById('tbody');

    res.map(e => tBoyd.innerHTML += `
        <tr>
            <td>${e.id}</td>
            <td>${e.username}</td>
            <td>${e.name}</td>
            <td class="hide">${e.email}</td>
            <td class="hide">${e.phone}</td>
            <td class="hide">${e.website}</td>
            <td class="hide">${e.company.name}</td>
            <td class="hide">${e.address.city}, ${e.address.street}, ${e.address.suite}</td>
        </tr>
    `)
    document.getElementById('getDataButton').disabled = true;
    console.log(res)
});