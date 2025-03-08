import streamlit as st

def main():
    st.title("Reverse Osmosis Demo")

    # Slider inputs
    pressure = st.slider("Feed Pressure (bar)", 5, 50, 15)
    salt_conc = st.slider("NaCl Concentration (%)", 0.0, 5.0, 1.0)
    temp = st.slider("Feed Temperature (°C)", 5, 60, 25)

    # Placeholder calculations
    # (Replace these with your real membrane/RO equations)
    permeate_flow = pressure * 0.05
    retentate_flow = pressure * 0.04
    salt_rejection = 98 - salt_conc  # just a dummy example
    # Permeate flux = flow / membrane area (here area = 10 cm² in the worksheet)
    permeate_flux = permeate_flow / 10

    # Display outputs as a small HTML table
    st.write("## Results")
    results_table = f"""
    <table style="border:1px solid #333; border-collapse: collapse;">
      <tr>
        <th style="border:1px solid #333; padding:4px;">Output</th>
        <th style="border:1px solid #333; padding:4px;">Value</th>
      </tr>
      <tr>
        <td style="border:1px solid #333; padding:4px;">Permeate Flow (cm³/s)</td>
        <td style="border:1px solid #333; padding:4px;">{permeate_flow:.2f}</td>
      </tr>
      <tr>
        <td style="border:1px solid #333; padding:4px;">Retentate Flow (cm³/s)</td>
        <td style="border:1px solid #333; padding:4px;">{retentate_flow:.2f}</td>
      </tr>
      <tr>
        <td style="border:1px solid #333; padding:4px;">Salt Rejection (%)</td>
        <td style="border:1px solid #333; padding:4px;">{salt_rejection:.2f}</td>
      </tr>
      <tr>
        <td style="border:1px solid #333; padding:4px;">Permeate Flux (cm³/s/cm²)</td>
        <td style="border:1px solid #333; padding:4px;">{permeate_flux:.4f}</td>
      </tr>
    </table>
    """
    st.markdown(results_table, unsafe_allow_html=True)

if __name__ == "__main__":
    main()
