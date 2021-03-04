class Post {
    posts
    postAdd
    API_URL = 'http://localhost:5000/posts'

    constructor () {
        this.getAllPosts()
        this.submitForm()
    }

    async getOnePost (id) {
        let idSplit = id.split('-')[1]
        try {
            const post = await this.getPostById(idSplit)
            document.querySelector(`#hiddenModal`).value = post._id
            document.querySelector(`#modalTitle`).value = post.title
            document.querySelector(`#modalAuthor`).value = post.author
            document.querySelector(`#modalContent`).value = post.content
        } catch (err) {
            console.log(err)
        }
    }

    async updateOnePost () {
        let id = document.querySelector(`#hiddenModal`).value
        let author = document.querySelector(`#modalAuthor`).value
        let title = document.querySelector(`#modalTitle`).value
        let content = document.querySelector(`#modalContent`).value
        let data = {title: title, author:author, content:content}
        try {
            await this.updatePost(id, data)
            await this.reloadListe()
        } catch (err) {
            console.log(err)
        }
    }

    async deleteOnePost (id) {
        let idSplit = id.split('-')[1]
        document.querySelector(`#card-${idSplit}`).remove()
        try {
            await this.deletePost(idSplit)
        } catch (err) {
            console.log(err)
        }
    }

    submitForm () {
        try {
            document.querySelector('.formSubmit').addEventListener('click',async () => {
                let title = document.querySelector('#title').value
                let author = document.querySelector('#author').value
                let content = document.querySelector('#content').value
                let data = {title: title, author: author, content: content}
                document.querySelector('#title').value = ""
                document.querySelector('#author').value = ""
                document.querySelector('#content').value = ""
                await this.postPost(data)
                let cardComponent = this.cardComponent(this.postAdd._id, this.postAdd.author, this.postAdd.title, this.postAdd.content)
                document.querySelector('.cardListe').insertAdjacentHTML( 'beforeend', cardComponent );
            })
        } catch (err) {
            console.log(err)
        }
    }

    createPostCard () {
        for (let i = 0; i < this.posts.length; i++) {
            let cardComponent = this.cardComponent(this.posts[i]._id, this.posts[i].author, this.posts[i].title, this.posts[i].content)
            document.querySelector('.cardListe').insertAdjacentHTML( 'beforeend', cardComponent );
        }
    }

    cardComponent (id, author, title, content) {
        const cardComponent = `<div id="card-${id}" class="card border-dark mb-3">
                                    <div class="card-header">
                                        <div class="row justify-content-between">
                                            <div class="col-4 text-left">
                                                <h5 id="author" class="m-0">${author}</h5>
                                            </div>
                                            <div class="col-4 text-right">
                                                <button id="update-${id}"  onclick="PostClass.getOnePost(this.id)" data-toggle="modal" data-target="#exampleModal" class="btn btn-warning"><i class="fas fa-pen"></i></button>
                                                <button id="delete-${id}"  onclick="PostClass.deleteOnePost(this.id)" class="btn btn-danger"><i class="fas fa-trash"></i></button>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="card-body text-dark">
                                    <h5 class="card-title">${title}</h5>
                                    <p class="card-text">${content}</p>
                                    </div>
                                </div>`
        return cardComponent
    }

    async reloadListe () {
        document.querySelector('.cardListe').innerHTML = ""
        await this.getAllPosts()
    }


/*-----------------------*/
/*-----SERVICE A LAPI----*/
/*-----------------------*/
    async getAllPosts () {
        try {
            let res = await fetch(`${this.API_URL}`)
            let data = await res.json()
            this.posts = data
            this.createPostCard()
        } catch (err) {
            console.log(err)
        }
    }

    async getPostById (id) {
        try {
            let res = await fetch(`${this.API_URL}/${id}`)
            let data = await res.json()
            return data
        } catch (err) {
            console.log(err)
        }
    }

    async postPost (data) {
        const options = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {"Content-type": "application/json; charset=UTF-8"}
        }
        try {
            let res = await fetch(`${this.API_URL}`, options)
            let data = await res.json()
            this.postAdd = data
        } catch (err) {
            console.log(err)
        }
    }

    async updatePost (id, data) {
        const options = {
            method: 'PATCH',
            body: JSON.stringify(data),
            headers: {"Content-type": "application/json; charset=UTF-8"}
        }
        try {
            let res = await fetch(`${this.API_URL}/${id}`, options)
            let data = await res.json()
            return data
        } catch (err) {
            console.log(err)
        }
    }

    async deletePost (id) {
        const options = {
            method: 'DELETE'
        }
        try {
            let res = await fetch(`${this.API_URL}/${id}`, options)
            let data = await res.json()
            return data
        } catch (err) {
            console.log(err)
        }
    }
}

const PostClass = new Post()