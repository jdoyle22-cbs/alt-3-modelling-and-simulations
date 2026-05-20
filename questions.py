# ALT3 - Questions

from style import bold_text

data = {
    # Data will be added here when asked
}

def safe_input(question: str, ans_type: type = str):
    while True:
        try:
            ans = input(question)
            
            # Note:
            # switch (or as it's called in Python 'match') statement can't be used here as types are detected as patterns
            if ans_type is int:
                ans = int(ans)
            elif ans_type is float:
                ans = float(ans)
            elif ans_type is str:
                ans = str(ans)
            # Python parses booleans very odd, e.g. "False" = True as it's a string. So, we have to manually handle it.
            elif ans_type is bool:
                accepted_answers: list[str] = ["True", "False", "1", "0"]
                if ans not in accepted_answers:
                    raise Exception
                else:
                    if ans == "True":
                        ans = True
                    elif ans == "False":
                        ans = False
                    elif ans == 1:
                        ans = True
                    else:
                        ans = False
            
            return ans
        except ValueError:
            print("Please enter a valid value.\n")
            continue

def ask_questions():
    country: str = safe_input(bold_text("Please enter the country (string): "), str)
    data["country"]: str = country
    
    tourists_last_year = safe_input(bold_text("No. of Tourists last year (integer): "), int)
    data["tourists_last_year"]: int = tourists_last_year
    
    projected_best_case_tourists_increase: float = safe_input(bold_text("Projected best case (i.e. disregarding any issues which may affect it) increase in number of tourists next year (%): "), float)
    data["projected_best_case_tourists_increase"]: float = projected_best_case_tourists_increase
    
    # Every 1% increase in crime rate = 0.07% less tourists
    # Shchokin, R., Maziychuk, V., Mykhailyk, O., Kolomiiets, A., Akifzade, S., & Tymoshenko, Y. (2023). THE IMPACT OF THE CRIME RATE ON THE HOSPITALITY AND TOURISM INDUSTRY IN THE EU COUNTRIES. GeoJournal of Tourism and Geosites, 46(1), 135–147. https://doi.org/10.30892/gtg.46115-1009
    projected_crime_rate: float = safe_input(bold_text("Projected crime rate next year (%): "), float)
    data["projected_crime_rate"]: float = projected_crime_rate
    
    # Sudden 10% inflation = roughly 20% tourism drop
    # Pan, L., Dwumfour, R. (Unknown date) Inflation Anchoring and Behavioural Tourism Demand. School of Accounting, Economics and Finance, Curtin University, Australia., Centre for Development Economics and Sustainability, Monash University, Australia. https://dwumfour.github.io/pdf/wip/Lei_Dwumfour_tourism_and_inflation.pdf
    projected_inflation_rate: float = safe_input(bold_text("Projected inflation rate next year (%): "), float)
    data["projected_inflation_rate"]: float = projected_inflation_rate
        
    # Effectively the upper limit for how many tourists there can be
    # E.g. only 35 million can go through Dublin Airport per year
    # A more complex model may take into account the different usage of infrastructure, e.g. DUB airport is used more so that has a bigger impact on tourist numbers
    infrastructure_capacity: float = safe_input(bold_text("Maximum amount of inbound tourists by infrastructure capacity per year: "), float)
    data["infrastructure_capacity"]: float = infrastructure_capacity
    
    # Avg. 80 decrease by all travel during Covid-level event
    # Roman, Michał & Roman, Monika & Grzegorzewska, Emilia & Pietrzak, Piotr & Roman, Kamil. (2022). Influence of the COVID-19 Pandemic on Tourism in European Countries: Cluster Analysis Findings. Sustainability. 14. 1602. 10.3390/su14031602.
    possibility_of_viral_outbreak: bool = safe_input(bold_text("Will there be a viral outbreak next year (bool): "), bool)
    data["possibility_of_viral_outbreak"]: bool = possibility_of_viral_outbreak
    
    return data