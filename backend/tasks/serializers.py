from rest_framework import serializers
from .models import ToDoListCategory, Task, TaskAssignee, TaskAssignment

class TaskAssigneeSerializer(serializers.ModelSerializer):
    account = serializers.PrimaryKeyRelatedField(read_only=True) 

    class Meta:
        model = TaskAssignee
        fields = ('id', 'account', 'name')

class TaskSerializer(serializers.ModelSerializer):
    assignees = serializers.SerializerMethodField()
    account = serializers.PrimaryKeyRelatedField(read_only=True) 
    category = serializers.PrimaryKeyRelatedField(queryset=ToDoListCategory.objects.all())

    class Meta:
        model = Task
        fields = ('id', 'account', 'name', 'category', 'description', 'deadline', 'completed', 'assignees')

    def get_assignees(self, obj):
        task_assignments = TaskAssignment.objects.filter(task=obj)
        assignees = TaskAssignee.objects.filter(id__in=[assignment.assignee.id for assignment in task_assignments])
        return TaskAssigneeSerializer(assignees, many=True).data
    
class ToDoListCategorySerializer(serializers.ModelSerializer):
    category = serializers.CharField(source='name')
    account = serializers.PrimaryKeyRelatedField(read_only=True) 
    tasks = TaskSerializer(many=True, read_only=True)
    
    class Meta:
        model = ToDoListCategory
        fields = ('id', 'account', 'category', 'tasks')

class TaskAssignmentSerializer(serializers.ModelSerializer):
    account = serializers.PrimaryKeyRelatedField(read_only=True) 

    class Meta:
        model = TaskAssignment
        fields = ('id', 'account', 'assignee', 'task')

class EmailTaskSerializerEng(serializers.ModelSerializer):
    category = serializers.CharField(source='category.name')
    assignees = serializers.SerializerMethodField()

    class Meta:
        model = Task
        fields = ('name', 'category', 'description', 'deadline', 'completed', 'assignees')

    def get_assignees(self, obj):
        task_assignments = TaskAssignment.objects.filter(task=obj)
        assignees = TaskAssignee.objects.filter(id__in=[assignment.assignee.id for assignment in task_assignments])
        return TaskAssigneeSerializer(assignees, many=True).data

class EmailTaskSerializerPl(serializers.ModelSerializer):
    kategoria = serializers.CharField(source='category.name')
    przypisani = serializers.SerializerMethodField()
    termin = serializers.DateTimeField(source='deadline')
    zrealizowane = serializers.SerializerMethodField()

    class Meta:
        model = Task
        fields = ('nazwa', 'kategoria', 'opis', 'termin', 'zrealizowane', 'osoby')

    def get_przypisani(self, obj):
        task_assignments = TaskAssignment.objects.filter(task=obj)
        assignees = TaskAssignee.objects.filter(id__in=[assignment.assignee.id for assignment in task_assignments])
        return TaskAssigneeSerializer(assignees, many=True).data
    
    def get_zrealizowane(self, obj):
        return 'tak' if obj.completed else 'nie'
