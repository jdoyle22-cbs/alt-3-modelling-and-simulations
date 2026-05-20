from chafa import *
from chafa.loader import Loader

# The font ratio of JetBrains Mono (width/height)
FONT_RATIO = 11/24

# Create a canvas config
config = CanvasConfig()

# Configure the canvas geometry
config.width  = 40
config.height = 40

# Load the snake
image = Loader("./foo.png")

# Configure the ideal canvas geometry based on our FONT_RATIO
config.calc_canvas_geometry(
   image.width,
   image.height,
   FONT_RATIO
)

# Init the canvas
canvas = Canvas(config)

# Draw to the canvs
canvas.draw_all_pixels(
   image.pixel_type,
   image.get_pixels(),
   image.width, image.height,
   image.rowstride
)

# Print the output
output = canvas.print()

print(output.decode())