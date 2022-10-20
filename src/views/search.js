import { html } from '../../node_modules/lit-html/lit-html.js';
import { searchByPO } from '../api/data.js';

const searchTemplate = (onSearch, data, allPOs) => html`
<div id="search-POs">
    <h1>Filter by PO</h1>
    <div class="container">
        <input id="searchField" type="text" name="search" placeholder="Enter desired PO number" .value=${allPOs || ''}>
        <button @click=${onSearch} class="button-list" id="searchBtn">Search</button>
    </div>
    <h2>Results:</h2>
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
            <tbody class="POs">
                ${data.length != 0 ? data.map(searchedPOTemplate) : html`<p class="no-POs"> No results.</p>`}
            </tbody>
        </table>
    </section>
</div>`;

const searchedPOTemplate = (PO) => html`
    <tr>
       <td id="${PO._id}">${PO.PO_Number}</td>
       <td>${PO.Supplier}</td>
       <td>${PO.Event}</td>
       <td>${PO.StockType}</td>
       <td>${PO.Remarks}</td> 
    </tr>`;

export async function searchPage(ctx) {
    const allPOs = Number(ctx.querystring.split('=')[1]);
    const searchedPO = Number.isNaN(allPOs) ? [] : await searchByPO(allPOs);

    ctx.render(searchTemplate(onSearch, searchedPO, allPOs));

    async function onSearch() {
        const query = Number(document.querySelector('input[type=text]').value);

        ctx.page.redirect(`search?query=${query}`)
    }
}