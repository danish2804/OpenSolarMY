import unittest
from battery_sizing import (calculate_battery_output,
                            calculate_average_discharge_rate,
                            calculate_battery_rated_capacity,
                            calculate_average_DOD_avg)
class TestBatteryOutput(unittest.TestCase):

    def test_calculation(self):
        '''
         Imagine you have a system that demands 450 Wh (Watt-hours) of
         energy on a daily basis during the most crucial month of its operation.
         The system operates at a nominal DC-system voltage of 24 V.
         Additionally, it's designed to ensure uninterrupted operation for a
         specified duration of 4 days in the event of a power outage.

          What capacity should the battery bank possess to sustain
          these loads during the autonomy period?
        :return:
        '''
        # Input values

        E_crit = 450
        t_a = 4
        V_sdc = 24
        B_out_expected = 75

        # Calculate B_out
        B_out_calculated = calculate_battery_output(E_crit, t_a, V_sdc)

        # Assert the result
        self.assertEqual(B_out_calculated, B_out_expected)

class TestAverageDischargeRate(unittest.TestCase):
    '''

    If the system loads run for 16 hours per day during a 3-day autonomy period,
    and the permissible depth of discharge
    is limited to 80%, what is the average discharge rate?
    '''
    def test_calculation(self):
        # Input values
        r_d_expected = 60 # Average discharge rate (in hr)
        t_op = 16
        t_a = 3
        DOD_a = 0.8

        # Calculate r_d
        r_d_calculated = calculate_average_discharge_rate(t_op, t_a, DOD_a)

        # Assert the result
        self.assertEqual(r_d_calculated, r_d_expected)

class TestBatteryRatedCapacity(unittest.TestCase):

    '''
    Let's examine a system that necessitates a total battery bank output of 500 Ah.
    The system operates with an allowable depth of discharge of 75% and endures
    a minimum operating temperature of -10°C (-4°F). The average discharge rate
    for this system is specified as C/50.
    According to the manufacturer's documentation on battery capacity,
    taking into account temperature and discharge-rate derating factors,
    which approximate to 80%, what is the necessary rated capacity for the battery
    bank?
    '''
    def test_calculation(self):
        # Input values

        B_out = 500
        DOD_a = 0.75
        C_Tr_d = 0.80
        B_rated_expected = 833 # Battery-bank rated capacity (in Ah)

        # Calculate B_rated
        B_rated_calculated = calculate_battery_rated_capacity(B_out, DOD_a, C_Tr_d)
        B_rated_calculated= round(B_rated_calculated)
        # Assert the result
        self.assertEqual(B_rated_calculated, B_rated_expected)

class TestAverageDODAvg(unittest.TestCase):

    def test_calculation(self):
        # Input values
        DOD_avg_expected = 0.15
        LF = 0.75
        E_day = 3900
        B_actual = 800
        V_SDC = 24

        # Calculate DOD_avg
        DOD_avg_calculated = calculate_average_DOD_avg(LF, E_day, B_actual, V_SDC)

        # Assert the result
        self.assertAlmostEqual(DOD_avg_calculated, DOD_avg_expected, places=2)

class TestAverageDailyDCEnergyConsumption(unittest.TestCase):

    def test_calculation(self):
        # Input values
        E_crit = 6578  # Wh/day
        V_sdc = 48  # V
        t_a = 3  # days
        B_out = 411  # Ah
        DOD_a = 0.80
        t_op = 11.2  # hrs/day

        min_temp = 0  # °C
        C_Tr_d = 0.90
        r_d_expected = 42  # hrs
        B_out_expected = 411  # Ah
        B_rated_expected=571

        B_out_calculated = calculate_battery_output(E_crit, t_a, V_sdc)
        B_out_calculated=round(B_out_calculated)
        self.assertAlmostEqual(B_out_calculated, B_out_expected, places=5)

        r_d_calculated = calculate_average_discharge_rate(t_op, t_a, DOD_a)

        # Assert the result
        self.assertEqual(round(r_d_calculated), r_d_expected)


        # Calculate B_rated
        B_rated_calculated = calculate_battery_rated_capacity(B_out, DOD_a, C_Tr_d)
        B_rated_calculated= round(B_rated_calculated)
        # Assert the result
        self.assertEqual(B_rated_calculated, B_rated_expected)



if __name__ == '__main__':
    unittest.main()