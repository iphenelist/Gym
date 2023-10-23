// Copyright (c) 2023, innocent P M and contributors
// For license information, please see license.txt

frappe.ui.form.on('Membership', {
	refresh(frm) {
		frm.set_value('from_date', frappe.datetime.nowdate());

	 }
});
