import re

def convert_px_to_vw(match):
    px_value = int(match.group(1))  # Extract the pixel value
    base_width = 1400  # The viewport width at which the design looks good
    vw_value = (px_value / base_width) * 100  # Convert px to vw
    return f"{vw_value:.2f}vw"  # Format the vw value to two decimal places

def convert_vw_to_px(match):
    vw_value = float(match.group(1))  # Extract the vw value
    base_width = 400  # The viewport width at which the design looks good
    px_value = (vw_value / 100) * base_width  # Convert vw to px
    return f"{px_value:.0f}px"  # Format the px value to whole numbers

def process_css_file(input_file_path, output_file_path):
    # Read the original CSS content
    with open(input_file_path, 'r') as file:
        css_content = file.read()

    # Replace all pixel values with vw
    converted_css = re.sub(r"(\d+)px", convert_px_to_vw, css_content)

    # Replace all vw values with px
    #converted_css = re.sub(r"(\d+\.?\d*)vw", convert_vw_to_px, css_content)

    # Write the converted CSS to a new file
    with open(output_file_path, 'w') as file:
        file.write(converted_css)

# Paths to the input and output CSS files
input_css_path = "list_pages/main/styles.css"
output_css_path = "new_styles.css"

# Call the function to process the CSS file
process_css_file(input_css_path, output_css_path)