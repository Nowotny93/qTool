import { html } from '../../node_modules/lit-html/lit-html.js';
import { createPO } from '../api/data.js';



const createTemplate = (onSubmit) => html`
<section id="create-PO">
    <form @submit=${onSubmit} id="create-form">
        <div class="container">
            <h1>Add PO</h1>
            <label for="PO_Number">PO Number</label>
            <input id="PO_Number" type="text" placeholder="Enter PO" name="PO_Number">
            <label for="Supplier">Supplier</label>
            <input id="Supplier" type="text" placeholder="Enter Supplier" name="Supplier">
            <label for="Event">Event</label>
            <input id="Event" type="text" placeholder="Enter Event" name="Event">
            <label for="StockType">Stock Type</label>
            <input id="StockType" type="text" placeholder="Enter Stock Type" name="StockType">
            <label for="Remarks">Remarks</label>
            <textarea id="Remarks" name="Remarks"></textarea>
            <input type="submit" class="registerbtn button" value="Create PO">
        </div>
    </form>
</section>`;

export async function createPage(ctx) {
    ctx.render(createTemplate(onSubmit));

    async function onSubmit(event) {
        event.preventDefault();

        const formData = new FormData(event.target);

        const PO_Number = formData.get('PO_Number').trim();
        const Supplier = formData.get('Supplier').trim();
        const Event = formData.get('Event').trim();
        const StockType = formData.get('StockType').trim();
        const Remarks = formData.get('Remarks').trim();

        try {
            if (!PO_Number || !Supplier || !Event || !StockType) {
                throw new Error('PO, SUP, Event and StockType fields are required!');
            }

            await createPO({ PO_Number, Supplier, Event, StockType, Remarks });

            event.target.reset();

            ctx.page.redirect('/all-POs');

        } catch (error) {
            alert(error.message);
        }
    }
}