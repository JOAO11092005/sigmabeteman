// Inicializar Firebase
var firebaseConfig = {
    apiKey: "AIzaSyBKzKAbuuT3Mj7ydrwEmxzY_LpaBpxb8NE",
    authDomain: "alien-craft-410814.firebaseapp.com",
    projectId: "alien-craft-410814",
    storageBucket: "alien-craft-410814.appspot.com",
    messagingSenderId: "744102452074",
    appId: "1:744102452074:web:48a692fd2a675eafd92313"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Elementos do DOM
const userList = document.getElementById('usersList');
const usernameInput = document.getElementById('usernameInput');
const priceInput = document.getElementById('priceInput');
const addUserBtn = document.getElementById('addUserBtn');
const saveUserBtn = document.getElementById('saveUserBtn');
const userModal = document.getElementById('userModal');
const platformModal = document.getElementById('platformModal');
const closeBtns = document.querySelectorAll('.close');
const subscriptionContainer = document.querySelector('.subscriptions');
const platformsList = document.getElementById('platformsList');
const platformNameInput = document.getElementById('platformNameInput');
const platformPriceInput = document.getElementById('platformPriceInput');
const addPlatformBtn = document.getElementById('addPlatformBtn');
const savePlatformBtn = document.getElementById('savePlatformBtn');
const totalPlatformsValue = document.getElementById('totalPlatformsValue');
const totalToBePaid = document.getElementById('totalToBePaid');
const currentDateTime = document.getElementById('currentDateTime');

let platforms = [];
let users = [];

// Mostrar modal ao clicar no botão "Adicionar Usuário"
addUserBtn.addEventListener('click', () => {
    userModal.style.display = "block";
});

// Mostrar modal ao clicar no botão "Adicionar Plataforma"
addPlatformBtn.addEventListener('click', () => {
    platformModal.style.display = "block";
});

// Fechar modais ao clicar nos botões de fechar
closeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        userModal.style.display = "none";
        platformModal.style.display = "none";
    });
});

// Salvar usuário ao clicar no botão "Salvar"
saveUserBtn.addEventListener('click', () => {
    const username = usernameInput.value;
    const subscriptions = Array.from(subscriptionContainer.querySelectorAll('input[type="checkbox"]:checked'))
        .map(input => input.value);
    const price = parseFloat(priceInput.value);

    if (username && subscriptions.length > 0 && !isNaN(price)) {
        db.collection('users').add({
            username: username,
            subscriptions: subscriptions,
            price: price,
            paid: false,
            createdAt: firebase.firestore.FieldValue.serverTimestamp() // Adiciona data de criação
        })
        .then(() => {
            console.log('Usuário adicionado com sucesso');
            usernameInput.value = '';
            priceInput.value = '';
            subscriptionContainer.querySelectorAll('input[type="checkbox"]').forEach(input => input.checked = false);
            userModal.style.display = "none";
        })
        .catch(error => {
            console.error('Erro ao adicionar usuário: ', error);
        });
    } else {
        alert('Por favor, preencha todos os campos corretamente.');
    }
});

// Salvar plataforma ao clicar no botão "Salvar"
savePlatformBtn.addEventListener('click', () => {
    const platformName = platformNameInput.value;
    const platformPrice = parseFloat(platformPriceInput.value);

    if (platformName && !isNaN(platformPrice)) {
        db.collection('platforms').add({
            name: platformName,
            price: platformPrice
        })
        .then(() => {
            console.log('Plataforma adicionada com sucesso');
            platformNameInput.value = '';
            platformPriceInput.value = '';
            platformModal.style.display = "none";
            updateSubscriptionCheckboxes();  // Atualizar checkboxes de assinaturas
        })
        .catch(error => {
            console.error('Erro ao adicionar plataforma: ', error);
        });
    } else {
        alert('Por favor, preencha todos os campos corretamente.');
    }
});

// Listar usuários
db.collection('users').onSnapshot(snapshot => {
    users = [];
    snapshot.forEach(doc => {
        const user = doc.data();
        users.push(user);
    });
    renderUsersList();
    calculateAndDisplayPaymentInfo();
});

// Listar plataformas
db.collection('platforms').onSnapshot(snapshot => {
    platforms = [];
    snapshot.forEach(doc => {
        const platform = doc.data();
        platforms.push(platform);
    });
    renderPlatformsList();
    calculateAndDisplayPaymentInfo();
});

// Renderizar lista de usuários
function renderUsersList() {
    userList.innerHTML = '';
    users.forEach(user => {
        const userElement = document.createElement('div');
        userElement.classList.add('user');

        const userInfo = document.createElement('span');
        userInfo.textContent = `${user.username} - ${user.subscriptions.join(', ')} - R$${user.price.toFixed(2)}/mês`;

        const paymentStatus = document.createElement('span');
        paymentStatus.textContent = user.paid ? 'Pago' : 'Não Pago';
        paymentStatus.style.marginLeft = '10px';

        const togglePaymentBtn = document.createElement('button');
        togglePaymentBtn.textContent = user.paid ? 'Marcar como Não Pago' : 'Marcar como Pago';
        togglePaymentBtn.addEventListener('click', () => {
            togglePayment(doc.id, user.paid);
        });

        const deleteUserBtn = document.createElement('button');
        deleteUserBtn.textContent = 'Remover';
        deleteUserBtn.addEventListener('click', () => {
            db.collection('users').doc(doc.id).delete()
                .then(() => {
                    console.log('Usuário removido com sucesso');
                })
                .catch(error => {
                    console.error('Erro ao remover usuário: ', error);
                });
        });

        const createdAt = document.createElement('span');
        if (user.createdAt) {
            const timestamp = user.createdAt.toDate();
            createdAt.textContent = ` - Registrado em ${timestamp.toLocaleDateString()}, ${timestamp.toLocaleTimeString()}`;
        }

        userElement.appendChild(userInfo);
        userElement.appendChild(paymentStatus);
        userElement.appendChild(togglePaymentBtn);
        userElement.appendChild(deleteUserBtn);
        userElement.appendChild(createdAt);
        userList.appendChild(userElement);
    });
}

// Renderizar lista de plataformas
function renderPlatformsList() {
    platformsList.innerHTML = '';
    platforms.forEach(platform => {
        const platformElement = document.createElement('div');
        platformElement.classList.add('platform');

        const platformInfo = document.createElement('span');
        platformInfo.textContent = `${platform.name} - R$${platform.price.toFixed(2)}/mês`;
        
        const deletePlatformBtn = document.createElement('button');
        deletePlatformBtn.textContent = 'Remover';
        deletePlatformBtn.addEventListener('click', () => {
            db.collection('platforms').doc(doc.id).delete()
                .then(() => {
                    console.log('Plataforma removida com sucesso');
                })
                .catch(error => {
                    console.error('Erro ao remover plataforma: ', error);
                });
        });

        platformElement.appendChild(platformInfo);
        platformElement.appendChild(deletePlatformBtn);
        platformsList.appendChild(platformElement);
    });
}

// Atualizar informações de pagamento
function calculateAndDisplayPaymentInfo() {
    const totalPlatformsCost = platforms.reduce((sum, platform) => sum + platform.price, 0);
    const totalUsersCost = users.reduce((sum, user) => sum + user.price, 0);

    totalPlatformsValue.textContent = `R$${totalPlatformsCost.toFixed(2)}`;
    totalToBePaid.textContent = `R$${(totalPlatformsCost - totalUsersCost).toFixed(2)}`;
}

// Alternar status de pagamento
function togglePayment(docId, currentStatus) {
    db.collection('users').doc(docId).update({
        paid: !currentStatus
    })
    .then(() => {
        console.log('Status de pagamento atualizado com sucesso');
    })
    .catch(error => {
        console.error('Erro ao atualizar status de pagamento: ', error);
    });
}

// Atualizar checkboxes de assinaturas
function updateSubscriptionCheckboxes() {
    db.collection('platforms').get()
    .then(snapshot => {
        subscriptionContainer.innerHTML = '';
        snapshot.forEach(doc => {
            const platform = doc.data();
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.id = platform.name;
            checkbox.value = platform.name;
            const label = document.createElement('label');
            label.textContent = `${platform.name} - R$${platform.price.toFixed(2)}/mês`;
            label.setAttribute('for', platform.name);
            subscriptionContainer.appendChild(checkbox);
            subscriptionContainer.appendChild(label);
        });
    })
    .catch(error => {
        console.error('Erro ao atualizar checkboxes de assinaturas: ', error);
    });
}

// Mostrar data e hora atuais
function showCurrentDateTime() {
    const now = new Date();
    currentDateTime.textContent = `Data e Hora Atuais: ${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;
}

// Atualizar a data e hora atuais a cada 1 segundo
setInterval(showCurrentDateTime, 1000);

// Inicialização
showCurrentDateTime();
updateSubscriptionCheckboxes

