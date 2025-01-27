import matplotlib.pyplot as plt

categories = ["lokalny", "zachłanny", "zachłanny + lokalny", "genetyczny", "wyżarzanie"]
high_var_values = [3639, 12006, 13304, 10470, 10544]
big_sample_values = [1643, 7109, 7109, 2988, 8842]

low_var_values = [357.0, 774.5, 847.0, 868.5, 900.5]

plt.bar(categories, big_sample_values)
plt.xlabel("Algorytmy")
plt.ylabel("Wyniki")
plt.title("Dużo grup")
plt.show()
