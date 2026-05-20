# ALT3 - Main model code

from questions import ask_questions
from style import bold_text

subtract_percentage = lambda initial, percent: initial - ((initial / 100) * percent)
tourist_numbers: float

def tourism_model(data):
    # Functions
    subtract_percentage = lambda initial, percent: initial - ((initial / 100) * percent)
    
    # Variables
    tourist_numbers: float = data["tourists_last_year"] + (data["tourists_last_year"] * (data["projected_best_case_tourists_increase"] / 100))

    # Model
    # Every 1% increase in crime rate = 0.07% less tourists
    tourist_numbers *= (1 - (data["projected_crime_rate"] * 0.07 / 100))

    # Sudden 10% inflation = roughly 20% tourism drop
    # Means: 1% inflation = 2% tourist drop
    tourist_numbers = subtract_percentage(tourist_numbers, (data["projected_inflation_rate"] * 2))
        
    # Viral outbreak = ~80% drop in tourists
    if data["possibility_of_viral_outbreak"] == True:
        tourist_numbers: float = subtract_percentage(tourist_numbers, 80)
        
    # Infrastructure Capacity
    if tourist_numbers > data["infrastructure_capacity"]:
        # Limit to maximum
        tourist_numbers = data["infrastructure_capacity"]
    else:
        tourist_numbers = tourist_numbers
        
    return tourist_numbers

print("ALT 3")
print("Tourism Model: How many people will go to your country next year?")
print("------------------------------------------------------------")

print("\nPlease input the required information below: \n")

try:
    data = ask_questions()

    result = tourism_model(data)

    # This does nothing in Thonny's shell
    print("\033[H\033[2J", end="")
    print(bold_text(f"\nProjected tourists next year for {data['country']}:"), result)
except Exception:
    print("\nSorry, something went wrong.")
except KeyboardInterrupt:
    print(bold_text("Aborting..."))