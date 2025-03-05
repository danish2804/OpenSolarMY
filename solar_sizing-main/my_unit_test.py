import unittest
from solar_pv_sizing import calculate_pv_sizing,array_rated_ouput,rated_array_max_powerV
class TestCalculatePVSizing(unittest.TestCase):

    def test_calculation(self):
        E_crit = 1580
        mu_batt = 0.90
        nominal_dc_voltage = 24
        t_psh = 4.9
        expected_output = 14.9

        result = calculate_pv_sizing(E_crit, mu_batt, nominal_dc_voltage, t_psh)

        self.assertAlmostEqual(result, expected_output, places=1)

class TestArrayRatedOutput(unittest.TestCase):

    def test_calculation(self):
        I_arr = 18
        c_s = 0.95
        expected_output = 18.95

        result = array_rated_ouput(I_arr, c_s)

        self.assertAlmostEqual(result, expected_output, places=2)
class TestRatedArrayMaxPowerV(unittest.TestCase):

    def test_calculation(self):
        nominal_dc_voltage = 24
        temp_coeff_voltage = -0.004
        max_module_temp = 50
        reference_temp = 25
        expected_output = 25.9

        result = rated_array_max_powerV(nominal_dc_voltage, temp_coeff_voltage, max_module_temp, reference_temp)

        self.assertAlmostEqual(result, expected_output, places=1)

class TestPVSystem(unittest.TestCase):

    def test_pv_system(self):
        # Input values
        E_crit = 6578
        nominal_dc_voltage = 48
        t_psh = 5.0
        mu_batt = 0.85
        c_s = 0.95
        temp_coeff_voltage = -0.004
        max_module_temp = 50
        reference_temp = 25

        # Calculate I_arr
        I_arr = calculate_pv_sizing(E_crit, mu_batt, nominal_dc_voltage, t_psh)

        # Calculate I_rated; Rated Array Maximum-Power Current
        I_rated = array_rated_ouput(I_arr, c_s)

        # Calculate rated_max_power_voltage: Rated Array Maximum-Power Voltage
        rated_max_power_voltage = rated_array_max_powerV(nominal_dc_voltage, temp_coeff_voltage, max_module_temp, reference_temp)

        # Expected output
        expected_output = 51.8

        # Assert the result
        self.assertAlmostEqual(rated_max_power_voltage, expected_output, places=1)


if __name__ == '__main__':
    unittest.main()