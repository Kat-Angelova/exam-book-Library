import {html} from '../../node_modules/lit-html/lit-html.js';
import {getMyBooks} from '../services/data.js';

const bookTemplate = (book) =>html`
            <li class="otherBooks">
                <h3>${book.title}</h3>
                <p>Type: ${book.type}</p>
                <p class="img"><img src=${book.imageUrl}></p>
                <a class="button" href="/details/${book._id}">Details</a>
            </li>
`;

const myBooksTemplate = (data, isData) =>html`
    <section id="my-books-page" class="my-books">
        <h1>My Books</h1>
        
        ${isData ? html`
        <ul class="my-books-list">
            ${data.map(bookTemplate)}
        </ul>` : html`<p class="no-books">No books in database!</p>`}

    </section>
`;

export async function myBooksPage(ctx) {
    const ownerId = sessionStorage.getItem('ownerId');
    const data = await getMyBooks(ownerId);
    const isData = data.length !== 0;

    ctx.render(myBooksTemplate(data, isData));

}