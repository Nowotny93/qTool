import { html } from '../../node_modules/lit-html/lit-html.js';
import { getAllPOs } from '../api/data.js';
import {deletePO} from "../api/data.js";


const allPOsTemplate = (data, onDelete) => html`
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
                   <td id="${PO._id}">${PO.PO_Number} <a class="button" href="/edit/${PO._id}">Edit</a><a href="" class="button" @click="${onDelete}">Delete</a></td>
                   <td>${PO.Supplier}</td>
                   <td>${PO.Event}</td>
                   <td>${PO.StockType}</td>
                   <td>${PO.Remarks}</td> 
                </tr>`)}
        </tbody>
    </table>
</section>`;


export async function allPOsPage(ctx) {
    const data = await getAllPOs();

    ctx.render(allPOsTemplate(data, onDelete));

    async function onDelete () {
        let PO_ID = this.parentElement.id
        const confirmed = confirm('Are you sure you want to delete this item?');

        if (confirmed) {
            await deletePO(PO_ID);
            ctx.page.redirect('/all-POs');
        }
    }

}