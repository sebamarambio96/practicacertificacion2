const containerForm = document.getElementById('containerForm')
const fragmentForm = document.createDocumentFragment()

function renderTransferList() {
    fetch(`http://localhost:3000/transferencias`)
        .then((resp) => resp.json())
        .then(data => {
            console.log(data)
            const containerTransfersList = document.getElementById('containerTransfersList')
            while (containerTransfersList.firstChild) {
                containerTransfersList.removeChild(containerTransfersList.firstChild);
            }
            const fragmentTable = document.createDocumentFragment()
            const templateTable = document.getElementById('templateTable').content;
            const clone = templateTable.cloneNode(true)
            fragmentTable.appendChild(clone)
            containerTransfersList.appendChild(fragmentTable)

            const containerCars = document.getElementById('carsData')
            const fragmentRows = document.createDocumentFragment()

            const templateRows = document.getElementById('templateRows').content;
            fetch(`http://localhost:3000/usuarios`)
                .then((resp) => resp.json())
                .then(users => {

                    data.map(item => {
                        const nameEmisor = users.find(user => user.id == item.emisor)
                        const receptorReceptor = users.find(user => user.id == item.receptor)
                        let t1 = templateRows.getElementById('1')
                        let t2 = templateRows.getElementById('2')
                        let t3 = templateRows.getElementById('3')
                        let t4 = templateRows.getElementById('4')
                        t1.textContent = item.currentAt
                        t2.textContent = nameEmisor.name
                        t3.textContent = receptorReceptor.name
                        t4.textContent = item.amount

                        const clone = templateRows.cloneNode(true)
                        fragmentRows.appendChild(clone)
                    })
                    containerCars.appendChild(fragmentRows)
                })

        })
}

renderTransferList()

function renderUsers() {
    fetch(`http://localhost:3000/usuarios`)
        .then((resp) => resp.json())
        .then(data => {
            console.log(data)
            const containerUsers = document.getElementById('containerUsers')
            while (containerUsers.firstChild) {
                containerUsers.removeChild(containerUsers.firstChild);
            }
            const fragmentTable = document.createDocumentFragment()
            const templateTableUsers = document.getElementById('templateTableUsers').content;
            const clone = templateTableUsers.cloneNode(true)
            fragmentTable.appendChild(clone)
            containerUsers.appendChild(fragmentTable)

            const containerCars = document.getElementById('carsData')
            const fragmentUsers = document.createDocumentFragment()

            const templateUsersList = document.getElementById('templateUsersList').content;
            data.map(item => {
                let t1 = templateUsersList.getElementById('1')
                let t2 = templateUsersList.getElementById('2')
                let edit = templateUsersList.getElementById('edit')
                let destroy = templateUsersList.getElementById('delete')
                t1.textContent = item.name
                t2.textContent = item.balance
                edit.dataset.id = item.id
                destroy.dataset.id = item.id
                const clone = templateUsersList.cloneNode(true)
                fragmentUsers.appendChild(clone)
            })
            containerCars.appendChild(fragmentUsers)
        })
}
renderUsers()

 

function addSend() {
    const btn = document.getElementById('btnModifySend')
    console.log(btn)
    btn.addEventListener('click', (e) => {
        e.preventDefault()
        //GET data
        let name = document.getElementById('nameAdd').value
        let balance = document.getElementById('balance').value
        const data = {
            name,
            balance
        }
        if (!Object.values(data).every(value => value != '')) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Debes rellenar todos los campos!'
            })
        } else {
            console.log(data)
            fetch(`http://localhost:3000/usuario`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(data)
            })
                .then(response => response.json())
                .then(res => {
                    if (res.auth) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Genial!',
                            text: `Usuario registrado`
                        })
                        location.reload()
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: `${res.message}`
                        })
                    }
                })
                .catch(err => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Ops!',
                        text: `${err.message}`
                    })
                })
        }
    })
}

addSend()


function renderUserOptions() {
    fetch(`http://localhost:3000/usuarios`)
        .then((resp) => resp.json())
        .then(data => {
            console.log(data)
            const containerUsers1 = document.getElementById('listClientTransfer1')
            const containerUsers2 = document.getElementById('listClientTransfer2')
            console.log(containerUsers1)
            const templateTransfer = document.getElementById('templateTransfer').content;

            const fragmentTransfer = document.createDocumentFragment()
            data.map(item => {
                const optionTransfer = templateTransfer.getElementById('optionTransfer')
                optionTransfer.value = item.id
                optionTransfer.textContent = item.name
                optionTransfer.className = 'emisor'
                const clone = templateTransfer.cloneNode(true)
                fragmentTransfer.appendChild(clone)
            })
            containerUsers1.appendChild(fragmentTransfer)
            data.map(item => {
                const optionTransfer = templateTransfer.getElementById('optionTransfer')
                optionTransfer.value = item.id
                optionTransfer.textContent = item.name
                optionTransfer.className = 'receptor'
                const clone = templateTransfer.cloneNode(true)
                fragmentTransfer.appendChild(clone)
            })
            containerUsers2.appendChild(fragmentTransfer)
        })
}
renderUserOptions()

function transfer() {
    const btn = document.getElementById('btnTransferSend')
    btn.addEventListener('click', () => {
        //GET data
        let emisorOption = document.getElementById('listClientTransfer1')
        let emisor = emisorOption.options[emisorOption.selectedIndex].value
        let receptorOption = document.getElementById('listClientTransfer2')
        let receptor = receptorOption.options[receptorOption.selectedIndex].value
        let amount = document.getElementById('amount').value
        const data = {
            emisor,
            receptor,
            amount
        }
        console.log(data)

        if (!Object.values(data).every(value => value != '')) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Debes rellenar todos los campos!'
            })
        } else {
            console.log(data)
            fetch(`http://localhost:3000/transferencias`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(data)
            })
                .then(response => response.json())
                .then(res => {
                    if (res.auth) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Genial!',
                            text: `Transferencia realizada`
                        })
                        location.reload()
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: `${res.message}`
                        })
                    }
                })
                .catch(err => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Ops!',
                        text: `${err.message}`
                    })
                })
        }
    })
}
transfer()

