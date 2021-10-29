import {html} from '../../node_modules/lit-html/lit-html.js';
import { getAllBooks } from '../services/data.js';

const bookTemplate = (book) =>html`
        <li class="otherBooks">
            <h3>${book.title}</h3>
            <p>Type: ${book.type}</p>
            <p class="img"><img src=${book.imageUrl}></p>
            <a class="button" href="/details/${book._id}">Details</a>
        </li>
`;

const dashboardTemplate = (data, isData) =>html`
    <section id="dashboard-page" class="dashboard">
        <h1>Dashboard</h1>
        ${isData ? html`
        <ul class="other-books-list">
            ${data.map(bookTemplate)}
        </ul>` 
        : html`<p class="no-books">No books in database!</p>`}
        
    </section
`;

export async function homePage(ctx) {
    const data = await getAllBooks();
    const isData = data.length !== 0;
    ctx.render(dashboardTemplate(data, isData));
}


