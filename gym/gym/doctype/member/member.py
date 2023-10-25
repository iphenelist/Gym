# Copyright (c) 2023, innocent P M and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document

class Member(Document):
    def validate(self):
        self.create_gym_member_user()

    def create_gym_member_user(self):
        user = frappe.get_doc({
            "doctype": "User",
            "email": self.email_address, 
            "first_name": self.full_name, 
            "send_welcome_email": 1,
        })
        
        user.insert(ignore_permissions=True)

        self.add_role_to_user(user.name, "Gym Member")

    def add_role_to_user(self, user, role):
        user_doc = frappe.get_doc("User", user)
        if user_doc:
            if role not in [d.role for d in user_doc.get("roles")]:
                user_doc.append("roles", {"role": role})
                user_doc.save(ignore_permissions=True)
                frappe.db.commit()

