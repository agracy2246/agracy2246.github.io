from PIL import Image

# Load your image
image = Image.open('./src/assets/imgTuna.png')

# Define the coordinates for each sprite sheet (x1, y1, x2, y2)
sprite_sheets_bounds = [(0, 292, 289,421)]

# Crop and save each sprite sheet
for i, bounds in enumerate(sprite_sheets_bounds):
    cropped_image = image.crop(bounds)
    cropped_image.save(f'./cropped_sheets/sprite_sheet_{i}.png')

cropped_image.show()