export class View {
    constructor() {

        this.app = document.getElementById('app');
        this.searchInput = this.createElement('div', 'search-input');
        this.input = this.createElement('input', 'input')
        this.autocomBox = this.createElement('div', 'autocom-box')
        this.results = this.createElement('div', 'results')

        this.app.append(this.searchInput)
        this.searchInput.append(this.input)
        this.app.append(this.autocomBox)
        this.app.append(this.results)


    }

    createElement(elementTag, elementClass){
        const element = document.createElement(elementTag)
        if(elementClass){
            element.classList.add(elementClass)
        }
        return element
    }

    userInAutocomBox(userData){
        const userElement = this.createElement('li', 'list');
        userElement.innerHTML = `<span>${userData.name}</span>`;
        this.autocomBox.append(userElement);
        userElement.addEventListener('click', () => this.addInResults(userData))
    }


    addInResults(userData){
        const addedUser = this.createElement('div', 'result-card')
        addedUser.innerHTML = `<div class="result-card_text">
                               <span>Name:${userData.name}</span>
                               <span>Owner:${userData.owner.login}</span>
                               <span>Stars:${userData.stargazers_count}</span>
                               </div>
                               <button class="close"><img src="img/Vector%207.svg"></button>`;
        this.clearUsers()
        this.input.value = '';

        addedUser.querySelector('.close').addEventListener('click', () => {

            addedUser.remove();
        })
        this.results.append(addedUser)
    }

    clearUsers(){
        this.autocomBox.innerHTML = ''
    }
}