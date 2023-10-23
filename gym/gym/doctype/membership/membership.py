# Copyright (c) 2023, innocent P M and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document
from frappe.utils import today, add_days


class GymMembership(Document):
    def validate(self):
        self.create_gym_membership()

    def create_gym_membership(self):
        if self.to_date <= frappe.utils.nowdate():
            frappe.throw("To date cannot be equal to or earlier than the from date")
            
        if self.paid == 1:
            customer = frappe.get_doc({
                "doctype": "Customer", 
                "customer_name": self.gym_member,
                "customer_type": "Individual",
                "customer_group": "Individual",
                "territory": "Tanzania",
            })
            customer.insert(ignore_permissions=True)
            frappe.db.commit()