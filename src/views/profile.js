import { html } from '../../node_modules/lit-html/lit-html.js';
import { getUserPOs } from '../api/data.js';

const profileTemplate = (username, data) => html`
<article class="user-info">
    <div class="user-content">
        <p>Username: ${username}</p>
        <p>My POs count: ${data.length}</p>
    </div>
</article>
<h1 id="user-POs-title">User POs</h1>
<section id="POs-feed">
    <table class="container1">
        <thead>
            <tr>
                <th>PO</th>
                <th>Supplier</th>
                <th>Event</th>
                <th>Stock Type</th>
                <th>Remarks</th>
            </tr>
        </thead>

        <tbody>
            ${data.map(PO => html `
               <tr>
                   <td id="${PO._id}">${PO.PO_Number}</td>
                   <td>${PO.Supplier}</td>
                   <td>${PO.Event}</td>
                   <td>${PO.StockType}</td>
                   <td>${PO.Remarks}</td> 
                </tr>`)}
        </tbody>
    </table>
</section>`;



export async function profilePage(ctx) {
    const userId = sessionStorage.getItem('userId');
    const username = sessionStorage.getItem('username');

    const POs = await getUserPOs(userId);

    ctx.render(profileTemplate(username, POs));
}