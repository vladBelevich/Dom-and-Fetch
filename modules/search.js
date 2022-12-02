const USER_PER_PAGE = 5;

export class Search {

    constructor(view) {
        this.view = view;

        this.view.input.addEventListener('keyup', this.debounce(this.loadUsers.bind(this), 500))

    }

    async loadUsers() {
        let users;
        const searchValue = this.view.input.value;

        this.view.clearUsers()
        return await fetch(`https://api.github.com/search/repositories?q=${searchValue}&per_page=${USER_PER_PAGE}`)
            .then(res => {
                if(res.ok){
                    res.json().then(res =>{
                        users = res.items;
                        res.items.forEach(user => {
                            this.view.userInAutocomBox(user)
                        })
                    })
                }
            })
    }



    debounce(func, wait, immediate) {
        let timeout;
        return function () {
            const context = this, args = arguments;
            const later = function () {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if(callNow) func.apply(context, args)
        }
    }



}