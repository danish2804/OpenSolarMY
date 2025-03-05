def calculate_battery_output(E_crit, t_a, V_sdc):
    """
    Calculate the required battery-bank output in ampere-hours (Ah).

    Parameters:
    E_crit: Daily electrical-energy consumption during critical design month
            (in Wh/day)
    t_a: Autonomy (in days)
    V_sdc: Nominal DC-system voltage (in V)

    Returns:
    B_out: Required battery-bank output (in Ah)
    """
    B_out = (E_crit * t_a) / V_sdc
    return B_out

def calculate_average_discharge_rate(t_op, t_a, DOD_a):
    """
    Calculate the average discharge rate (in hr).

    Parameters:
    t_op: Weighted average operating time (in hr/day)
    t_a: Autonomy (in days)
    DOD_a: Allowable depth of discharge

    Returns:
    r_d: Average discharge rate (in hr)
    """
    r_d = (t_op * t_a) / DOD_a
    return r_d


def calculate_battery_rated_capacity(B_out, DOD_a, C_Tr_d):
    """
    Calculate the battery-bank rated capacity (in Ah).

    Parameters:
    B_out: Battery-bank required output (in Ah)
    DOD_a: Allowable depth of discharge
    C_Tr_d: Temperature and discharge-rate derating factor

    Returns:
    B_rated: Battery-bank rated capacity (in Ah)
    """
    B_rated = B_out / (DOD_a * C_Tr_d)
    return B_rated

def calculate_average_DOD_avg(LF, E_day, B_actual, V_SDC):
    """
    Calculate the average battery-bank daily depth of discharge.

    Parameters:
    LF: Estimated load fraction
    E_day: Average daily electrical-energy consumption (in Wh)
    B_actual: Actual total rated battery-bank capacity (in Ah)
    V_SDC: DC-system voltage (in V)

    Returns:
    DOD_avg: Average battery-bank daily depth of discharge
    """
    DOD_avg = LF * E_day / (B_actual * V_SDC)
    return DOD_avg