import { html } from '../../node_modules/lit-html/lit-html.js';
import { getBookById, deleteBook, addLike, bookLikesById, getLikesByUser } from '../services/data.js';

const detailsTemplate = (book, isOwner, onDelete) =>html`
<section id="details-page" class="details">
    <div class="book-information">
        <h3>${book.title}</h3>
        <p class="type">Type: ${book.type}</p>
        <p class="img"><img src=${book.imageUrl}></p>
        <div class="actions">

            ${isOwner ? html`
            <a class="button" href="/edit/${book._id}">Edit</a>
            <a @click=${onDelete} class="button" href="#">Delete</a>`
            : null}
            
            <div class="likes">
                <img class="hearts" src="/images/heart.png">
                <span id="total-likes">Likes: 0</span>
            </div>
            
        </div>
    </div>
    <div class="book-description">
        <h3>Description:</h3>
        <p>${book.description}</p>
    </div>
</section>
`;

export async function detailsPage(ctx) {
    const id = ctx.params.id;
    const book = await getBookById(id);

    const ownerId = sessionStorage.getItem('ownerId');
    const isOwner = ownerId == book._ownerId;
    //
    //const isAuthenticated = sessionStorage.getItem('authToken');
    

    // let likesCount = await bookLikesById(book._id);
    // let userLikes = await getLikesByUser(book._id);
    
    //ctx.render(detailsTemplate(book, isOwner, onDelete, isAuthenticated, onLike, userLikes, likesCount));
    ctx.render(detailsTemplate(book, isOwner, onDelete));

    // async function onLike(e) {
    //     e.target.remove();
    //     const id = book._id;

    //     await addLike({bookId: id});
    //     likesCount = await bookLikesById(id);
    //     userLikes = await getLikesByUser(id, ownerId);
    //     ctx.render(detailsTemplate(book, isOwner, onDelete, isAuthenticated, userLikes, likesCount));
    // }

    async function onDelete(){
        const confirmed = confirm('Are you sure you want to delete this meme?');

        if (confirmed) {
            await deleteBook(id);
            ctx.page.redirect('/');
        }

    }
}