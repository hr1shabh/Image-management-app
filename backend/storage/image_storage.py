# storage/image_storage.py
from typing import List
from models.image import Image

class ImageStorage:
    def __init__(self):
        self.images = []

    def get_images(self) -> List[Image]:
        return self.images

    def add_image(self, filename: str, label: str):
        new_image = Image(filename=filename, label=label)
        self.images.append(new_image)
        return new_image
    def delete_image(self, filename: str) -> Image:
        for image in self.images:
            if image.filename == filename:
                self.images.remove(image)
                return image
        return None
