export const fetchColorData = async (hex) => {
    try {
        const response = await fetch(`https://www.thecolorapi.com/id?hex=${hex.substring(1)}`);
        const data = await response.json();
        return {
            name: data.name.value,
            hsl: data.hsl.value,
            hex: data.hex.value
        };
    } catch (error) {
        console.error("Error fetching color data:", error);
        return { name: "Unknown Color", hex, rgb: "N/A", hsl: "N/A" };
    }
};

