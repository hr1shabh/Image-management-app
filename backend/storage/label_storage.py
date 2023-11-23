# storage/label_storage.py
from typing import List
from models.label import Label

class LabelStorage:
    def __init__(self):
        self.labels = []

    def get_labels(self) -> List[Label]:
        return self.labels

    def add_label(self, name: str) -> Label:
        new_label = Label(name=name)
        self.labels.append(new_label)
        return new_label

    def delete_label_by_name(self, label_name: str) -> Label:
        for label in self.labels:
            if label.name == label_name:
                self.labels.remove(label)
                return label
        return None