<template>
    <DataTable :value="users" :loading="loading" dataKey="id" showGridlines paginator :rows="5"
        paginatorTemplate="PrevPageLink PageLinks NextPageLink CurrentPageReport"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} users">
        <template #header>
            <div style="display: flex; justify-content: space-between;">
                <h5>Users List</h5>
                <Button icon="pi pi-plus" label="New User" @click="$emit('new')" />
            </div>
        </template>
        <Column field="id" header="#"></Column>
        <Column field="name" header="Name"></Column>
        <Column field="username" header="Username"></Column>
        <Column field="email" header="Email">
            <template #body="slotProps">
                <span :style="{ textTransform: 'lowercase' }">
                    {{ slotProps.data.email }}
                </span>
            </template>
        </Column>
        <Column field="phone" header="Phone">
            <template #body="slotProps">
                {{ formatPhone(slotProps.data.phone) }}
            </template>
        </Column>
        <Column header="Actions">
            <template #body="slotProps">
                <div :style="{ display: 'flex', gap: '1rem' }">
                    <Button icon="pi pi-pencil" rounded severity="info" variant="outlined"
                        @click="$emit('edit', slotProps.data)" />
                    <Button icon="pi pi-trash" rounded severity="danger" variant="outlined"
                        @click="$emit('delete', slotProps.data)" />
                </div>
            </template>
        </Column>
        <template #empty>
            <div style="text-align: center;">
                <i class="pi pi-folder-open" style="font-size: 2rem"></i>
                <p>No users found. Create one!</p>
            </div>
        </template>
    </DataTable>
</template>

<script setup lang="ts">
import { formatPhone } from '@/utils/formatters';
import type { lowercase } from 'zod';

defineProps<{
    users: any[],
    loading: boolean
}>();

defineEmits(['new', 'edit', 'delete']);
</script>