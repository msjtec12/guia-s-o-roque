'use client';

import React, { useState, use } from 'react';
import Link from 'next/link';
import { Building2, CheckCircle2, Send, ArrowLeft } from 'lucide-react';
import { submitPartnerLead } from '@/lib/services/data';
import { BusinessPlan } from '@/types';

interface CadastroParceiroPageProps {
  searchParams: Promise<{
    plan?: string;
  }>;
}

export default function CadastroParceiroPage({ searchParams }: CadastroParceiroPageProps) {
  const resolvedParams = use(searchParams);
  const initialPlan = (resolvedParams?.plan as BusinessPlan) || 'highlight';

  const [formData, setFormData] = useState({
    company_name: '',
    responsible_name: '',
    whatsapp: '',
    email: '',
    category: 'Restaurantes',
    city_id: 'sao-roque',
    address: '',
    instagram: '',
    website: '',
    description: '',
    desired_plan: initialPlan,
    message: '',
    termsAccepted: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!formData.company_name || !formData.responsible_name || !formData.whatsapp || !formData.email) {
      setErrorMessage('Por favor, preencha todos os campos obrigatórios (*).');
      return;
    }

    if (!formData.email.includes('@')) {
      setErrorMessage('Por favor, insira um e-mail válido.');
      return;
    }

    if (!formData.termsAccepted) {
      setErrorMessage('É necessário concordar em receber o contato da nossa equipe comercial.');
      return;
    }

    setIsSubmitting(true);

    try {
      await submitPartnerLead({
        company_name: formData.company_name,
        responsible_name: formData.responsible_name,
        whatsapp: formData.whatsapp,
        email: formData.email,
        category: formData.category,
        city_id: formData.city_id,
        address: formData.address,
        instagram: formData.instagram,
        website: formData.website,
        description: formData.description,
        desired_plan: formData.desired_plan,
        message: formData.message,
      });

      setIsSubmitted(true);
    } catch (err) {
      console.error(err);
      setErrorMessage('Ocorreu um erro ao enviar o formulário. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pb-20 space-y-8">
      
      {/* BREADCRUMB */}
      <Link
        href="/para-empresas"
        className="inline-flex items-center gap-1 text-xs font-semibold text-stone-600 hover:text-emerald-800 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Voltar para Planos</span>
      </Link>

      {/* HEADER */}
      <div className="space-y-2 text-center md:text-left border-b border-stone-200/80 pb-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-semibold">
          <Building2 className="w-3.5 h-3.5 text-emerald-700" />
          <span>Formulário Oficial de Anunciante</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">
          Cadastre sua Empresa
        </h1>
        <p className="text-sm text-stone-600">
          Preencha os dados abaixo para publicar ou pré-cadastrar seu estabelecimento na plataforma Descubra São Roque.
        </p>
      </div>

      {/* SUCCESS MODAL OR CONFIRMATION SCREEN */}
      {isSubmitted ? (
        <div className="bg-white rounded-3xl p-10 border border-stone-200/80 shadow-xl text-center space-y-6 animate-in zoom-in-95 duration-300 max-w-lg mx-auto">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h2 className="font-serif text-2xl font-bold text-stone-900">
              Cadastro recebido!
            </h2>
            <p className="text-sm text-stone-600 leading-relaxed">
              Obrigado pelo interesse. Recebemos os dados da sua empresa e entraremos em contato.
            </p>
          </div>

          <div className="pt-4 border-t border-stone-100 flex justify-center">
            <Link
              href="/"
              className="bg-emerald-800 hover:bg-emerald-900 text-white font-semibold text-sm px-6 py-3 rounded-xl shadow-md transition-all"
            >
              Voltar para a Página Principal
            </Link>
          </div>
        </div>
      ) : (
        /* FORM */
        <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-8 border border-stone-200/80 shadow-md space-y-6">
          
          {errorMessage && (
            <div className="p-4 rounded-xl bg-rose-50 text-rose-800 text-xs font-medium border border-rose-200">
              {errorMessage}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* NOME DA EMPRESA */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-stone-900 uppercase tracking-wider">
                Nome da Empresa *
              </label>
              <input
                type="text"
                name="company_name"
                value={formData.company_name}
                onChange={handleChange}
                placeholder="Ex.: Vinícola Bella Vista"
                required
                className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-emerald-600 text-sm font-medium"
              />
            </div>

            {/* RESPONSÁVEL */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-stone-900 uppercase tracking-wider">
                Nome do Responsável *
              </label>
              <input
                type="text"
                name="responsible_name"
                value={formData.responsible_name}
                onChange={handleChange}
                placeholder="Ex.: João Carlos"
                required
                className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-emerald-600 text-sm font-medium"
              />
            </div>

            {/* WHATSAPP */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-stone-900 uppercase tracking-wider">
                WhatsApp Comercial *
              </label>
              <input
                type="tel"
                name="whatsapp"
                value={formData.whatsapp}
                onChange={handleChange}
                placeholder="(11) 99999-9999"
                required
                className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-emerald-600 text-sm font-medium"
              />
            </div>

            {/* EMAIL */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-stone-900 uppercase tracking-wider">
                E-mail de Contato *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="contato@suaempresa.com.br"
                required
                className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-emerald-600 text-sm font-medium"
              />
            </div>

            {/* CATEGORIA */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-stone-900 uppercase tracking-wider">
                Categoria Principal
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-emerald-600 text-sm font-medium bg-white"
              >
                <option value="Vinícolas & Adegas">Vinícolas & Adegas</option>
                <option value="Restaurantes">Restaurantes</option>
                <option value="Hospedagem">Hotéis & Pousadas</option>
                <option value="Passeios & Agências">Passeios Turísticos</option>
                <option value="Cafés & Docerias">Cafés & Docerias</option>
                <option value="Natureza & Trilhas">Natureza & Trilhas</option>
                <option value="Compras & Doces">Empórios & Compras</option>
              </select>
            </div>

            {/* PLANO DESEJADO */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-stone-900 uppercase tracking-wider">
                Plano Desejado
              </label>
              <select
                name="desired_plan"
                value={formData.desired_plan}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-emerald-600 text-sm font-medium bg-white"
              >
                <option value="free">Plano Gratuito (R$ 0)</option>
                <option value="highlight">Plano Destaque (R$ 39,90/mês)</option>
                <option value="premium">Plano Premium (R$ 79,90/mês)</option>
              </select>
            </div>

            {/* ENDEREÇO */}
            <div className="space-y-1.5 md:col-span-2">
              <label className="text-xs font-bold text-stone-900 uppercase tracking-wider">
                Endereço Completo
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Ex.: Estrada do Vinho, km 5, São Roque - SP"
                className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-emerald-600 text-sm font-medium"
              />
            </div>

            {/* INSTAGRAM */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-stone-900 uppercase tracking-wider">
                Instagram (@usuario)
              </label>
              <input
                type="text"
                name="instagram"
                value={formData.instagram}
                onChange={handleChange}
                placeholder="exemplo.saoroque"
                className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-emerald-600 text-sm font-medium"
              />
            </div>

            {/* WEBSITE */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-stone-900 uppercase tracking-wider">
                Website
              </label>
              <input
                type="url"
                name="website"
                value={formData.website}
                onChange={handleChange}
                placeholder="https://suaempresa.com.br"
                className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-emerald-600 text-sm font-medium"
              />
            </div>

            {/* DESCRIÇÃO */}
            <div className="space-y-1.5 md:col-span-2">
              <label className="text-xs font-bold text-stone-900 uppercase tracking-wider">
                Breve Descrição do Estabelecimento
              </label>
              <textarea
                name="description"
                rows={3}
                value={formData.description}
                onChange={handleChange}
                placeholder="Conte um pouco sobre suas especialidades, ambiente e atrações..."
                className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-emerald-600 text-sm font-medium"
              />
            </div>

            {/* MENSAGEM */}
            <div className="space-y-1.5 md:col-span-2">
              <label className="text-xs font-bold text-stone-900 uppercase tracking-wider">
                Observações ou Dúvidas
              </label>
              <textarea
                name="message"
                rows={2}
                value={formData.message}
                onChange={handleChange}
                placeholder="Alguma informação adicional que gostaria de nos contar..."
                className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-emerald-600 text-sm font-medium"
              />
            </div>

          </div>

          {/* CHECKBOX */}
          <div className="pt-2">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="termsAccepted"
                checked={formData.termsAccepted}
                onChange={handleChange}
                className="w-4 h-4 mt-1 rounded text-emerald-800 focus:ring-emerald-600 accent-emerald-800"
              />
              <span className="text-xs text-stone-600 leading-normal">
                Concordo em receber contato sobre o cadastro da minha empresa e autorizo o envio de mensagens informativas via WhatsApp/E-mail.
              </span>
            </label>
          </div>

          {/* SUBMIT BUTTON */}
          <div className="pt-4 border-t border-stone-100 flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-sm px-8 py-3.5 rounded-xl shadow-lg transition-all disabled:opacity-50"
            >
              <Send className="w-4 h-4 text-amber-400" />
              <span>{isSubmitting ? 'Enviando...' : 'Enviar Cadastro'}</span>
            </button>
          </div>

        </form>
      )}

    </div>
  );
}
